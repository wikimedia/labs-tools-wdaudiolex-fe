import { createReadStream, existsSync, statSync } from "node:fs";
import { createServer } from "node:http";
import { extname, join, sep } from "node:path";
import { fileURLToPath } from "node:url";

const distDir = fileURLToPath( new URL( "./dist", import.meta.url ) );
const port = Number( process.env.PORT ) || 8000;

const contentTypes = {
	".css": "text/css; charset=utf-8",
	".gif": "image/gif",
	".html": "text/html; charset=utf-8",
	".ico": "image/x-icon",
	".jpeg": "image/jpeg",
	".jpg": "image/jpeg",
	".js": "text/javascript; charset=utf-8",
	".json": "application/json; charset=utf-8",
	".map": "application/json; charset=utf-8",
	".png": "image/png",
	".svg": "image/svg+xml",
	".ttf": "font/ttf",
	".txt": "text/plain; charset=utf-8",
	".webmanifest": "application/manifest+json",
	".webp": "image/webp",
	".woff": "font/woff",
	".woff2": "font/woff2"
};

if ( !Number.isInteger( port ) || port <= 0 || port > 65535 ) {
	console.error( "PORT must be a TCP port number." );
	process.exit( 1 );
}

if ( !existsSync( join( distDir, "index.html" ) ) ) {
	console.error( "Missing dist/index.html. Run npm run build before starting the server." );
	process.exit( 1 );
}

/**
 * Map a URL path onto a file inside dist.
 * Returns null when the path escapes that directory.
 *
 * @param {string} pathname
 * @return {string|null}
 */
function fileFor( pathname ) {
	let decoded;
	try {
		decoded = decodeURIComponent( pathname );
	} catch ( error ) {
		return null;
	}

	if ( decoded.includes( "\0" ) ) {
		return null;
	}

	const relative = decoded.replace( /^\/+/, "" );
	const candidate = join( distDir, relative );
	const rootPrefix = distDir.endsWith( sep ) ? distDir : distDir + sep;
	if ( candidate !== distDir && !candidate.startsWith( rootPrefix ) ) {
		return null;
	}
	return candidate;
}

/**
 * @param {string} filePath
 * @return {Record<string, string>}
 */
function headersFor( filePath ) {
	const extension = extname( filePath ).toLowerCase();
	const type = contentTypes[ extension ] || "application/octet-stream";
	const hashedAsset = filePath.includes( `${ sep }assets${ sep }` );
	let cacheControl = "public, max-age=3600";
	if ( extension === ".html" ) {
		cacheControl = "no-cache";
	} else if ( hashedAsset ) {
		cacheControl = "public, max-age=31536000, immutable";
	}

	return {
		"Cache-Control": cacheControl,
		"Content-Type": type,
		"X-Content-Type-Options": "nosniff"
	};
}

/**
 * @param {string} pathname
 * @return {{filePath: string}|{error: number}}
 */
function resolveFile( pathname ) {
	let filePath = fileFor( pathname );
	if ( !filePath ) {
		return { error: 400 };
	}

	if ( existsSync( filePath ) && statSync( filePath ).isDirectory() ) {
		filePath = join( filePath, "index.html" );
	}

	if ( existsSync( filePath ) && statSync( filePath ).isFile() ) {
		return { filePath };
	}

	// /help and /oauth-callback are client routes. A missing .js or .css stays a 404.
	if ( extname( pathname ) ) {
		return { error: 404 };
	}

	return { filePath: join( distDir, "index.html" ) };
}

const server = createServer( ( request, response ) => {
	if ( request.method !== "GET" && request.method !== "HEAD" ) {
		response.writeHead( 405, { Allow: "GET, HEAD" } );
		response.end( "Method not allowed" );
		return;
	}

	let pathname = "/";
	try {
		pathname = new URL( request.url || "/", "http://127.0.0.1" ).pathname;
	} catch ( error ) {
		response.writeHead( 400 );
		response.end( "Bad request" );
		return;
	}

	const resolved = resolveFile( pathname );
	if ( "error" in resolved ) {
		response.writeHead( resolved.error );
		response.end( resolved.error === 400 ? "Bad request" : "Not found" );
		return;
	}

	response.writeHead( 200, headersFor( resolved.filePath ) );
	if ( request.method === "HEAD" ) {
		response.end();
		return;
	}

	const stream = createReadStream( resolved.filePath );
	stream.on( "error", () => {
		if ( !response.headersSent ) {
			response.writeHead( 500 );
		}
		response.end();
	} );
	stream.pipe( response );
} );

server.listen( port, "0.0.0.0", () => {
	console.log( `WDAudioLex frontend listening on 0.0.0.0:${ port }` );
} );
