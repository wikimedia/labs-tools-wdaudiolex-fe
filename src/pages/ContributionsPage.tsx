import React, { useEffect, useState } from "react";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Link,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

import { redirectToWikimediaLogin } from "../auth/login";
import { readSession } from "../auth/session";
import { apiErrorMessage, getContributions } from "../services/api";
import type { ContributionRecord } from "../services/types";

function formatDate(value: string | null): string {
  if (!value) {
    return "—";
  }
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value;
  }
  return date.toLocaleString();
}

function cellText(value: string | null): string {
  const text = value?.trim();
  return text ? text : "—";
}

function lexemeId(formId: string): string {
  return formId.replace(/-F.*$/, "");
}

function commonsTitle(filename: string): string {
  return filename.startsWith("File:") ? filename : `File:${filename}`;
}

const ContributionsPage: React.FC = () => {
  const username = readSession()?.username ?? null;
  const [rows, setRows] = useState<ContributionRecord[]>([]);
  const [loading, setLoading] = useState(Boolean(username));
  const [error, setError] = useState<string | null>(null);
  const [attempt, setAttempt] = useState(0);

  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);

  const handleLogin = () => {
    if (loginLoading) {
      return;
    }
    setLoginLoading(true);
    setLoginError(null);
    redirectToWikimediaLogin().catch((err: unknown) => {
      setLoginError(apiErrorMessage(err));
      setLoginLoading(false);
    });
  };

  useEffect(() => {
    if (!username) {
      setRows([]);
      setLoading(false);
      setError(null);
      return undefined;
    }

    let cancelled = false;
    setLoading(true);
    setError(null);

    getContributions({ username })
      .then((data) => {
        if (!cancelled) {
          setRows(data);
        }
      })
      .catch((err: unknown) => {
        if (!cancelled) {
          setRows([]);
          setError(apiErrorMessage(err));
        }
      })
      .finally(() => {
        if (!cancelled) {
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [username, attempt]);

  return (
    <Box>
      <Box sx={{ mb: 2 }}>
        <Typography variant="h5" component="h1" sx={{ fontWeight: 400, color: "#222" }}>
          My Contributions
        </Typography>
        <Typography variant="body2" sx={{ color: "#72777d" }}>
          {username
            ? `Pronunciations saved on Wikidata by ${username}.`
            : "Pronunciations saved on Wikidata."}
        </Typography>
      </Box>

      {!username && (
        <Paper variant="outlined" sx={{ p: 3, backgroundColor: "#f8f9fa", borderColor: "#a2a9b1" }}>
          <Typography sx={{ color: "#72777d", mb: 2 }}>
            Please log in with your Wikimedia account to see your contributions.
          </Typography>
          {loginError && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {loginError}
            </Alert>
          )}
          <Button
            variant="contained"
            onClick={handleLogin}
            disabled={loginLoading}
          >
            {loginLoading ? "Logging in…" : "Log in"}
          </Button>
        </Paper>
      )}

      {username && loading && (
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, py: 4 }} role="status">
          <CircularProgress size={22} />
          <Typography variant="body2" sx={{ color: "#72777d" }}>
            Loading contributions…
          </Typography>
        </Box>
      )}

      {username && !loading && error && (
        <Alert
          severity="error"
          action={
            <Button color="inherit" size="small" onClick={() => setAttempt((current) => current + 1)}>
              Try again
            </Button>
          }
        >
          {error}
        </Alert>
      )}

      {username && !loading && !error && rows.length === 0 && (
        <Paper variant="outlined" sx={{ p: 3, backgroundColor: "#f8f9fa", borderColor: "#a2a9b1" }}>
          <Typography sx={{ color: "#72777d" }}>
            There are no matches yet.
          </Typography>
        </Paper>
      )}

      {username && !loading && !error && rows.length > 0 && (
        <TableContainer component={Paper} variant="outlined">
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>Form id</TableCell>
                <TableCell>Filename</TableCell>
                <TableCell>Language</TableCell>
                <TableCell>Revision id</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => {
                const formId = row.form_id?.trim() || "";
                const filename = row.audio_filename?.trim() || "";
                return (
                  <TableRow key={row.id}>
                    <TableCell>{formatDate(row.date)}</TableCell>
                    <TableCell>
                      {formId ? (
                        <Link
                          href={`https://www.wikidata.org/wiki/Lexeme:${encodeURIComponent(lexemeId(formId))}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {formId}
                        </Link>
                      ) : "—"}
                    </TableCell>
                    <TableCell>
                      {filename ? (
                        <Link
                          href={`https://commons.wikimedia.org/wiki/${encodeURIComponent(commonsTitle(filename))}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {filename}
                        </Link>
                      ) : "—"}
                    </TableCell>
                    <TableCell>{cellText(row.lang_code)}</TableCell>
                    <TableCell>{cellText(row.revision_id)}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

export default ContributionsPage;
