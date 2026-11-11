import React from "react";
import { Box, Link, Typography } from "@mui/material";

const labelSx = {
  color: "#72777d",
  fontSize: "10px",
  fontWeight: 700,
};

const Footer: React.FC = () => {
  return (
    <Box
      component="footer"
      sx={{
        mt: "auto",
        bgcolor: "#f8f9fa",
        borderTop: "1px solid #a2a9b1",
        height: 64,
        display: "flex",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: "80rem",
          mx: "auto",
          px: { xs: 2, sm: 3, lg: 4 },
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 1.5,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Typography component="span" sx={labelSx}>
            Powered by
          </Typography>
          <Link href="https://www.wikidata.org/" target="_blank" rel="noopener noreferrer" sx={{ display: "flex" }}>
            <Box
              component="img"
              src="https://upload.wikimedia.org/wikipedia/commons/6/66/Wikidata-logo-en.svg"
              alt="Wikidata"
              sx={{ width: 64, height: "auto", display: "block" }}
            />
          </Link>
        </Box>

        <Typography
          component="p"
          sx={{
            color: "#72777d",
            fontSize: "12px",
            textAlign: "center",
            m: 0,
            flex: "1 1 auto",
            whiteSpace: "nowrap",
          }}
        >
          License for content: <Box component="span" sx={{ fontWeight: 700 }}>CC0 for data</Box>
          {", "}
          <Box component="span" sx={{ fontWeight: 700 }}>CC-BY-SA for text and media</Box>
          {" | "}
          <Link
            href="https://phabricator.wikimedia.org/tag/wdaudiolex/"
            target="_blank"
            rel="noopener noreferrer"
            sx={{ color: "#72777d", whiteSpace: "nowrap" }}
          >
            Report technical problems on our phabricator board.
          </Link>
        </Typography>

        {/* <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Typography component="span" sx={{ ...labelSx, mb: 0 }}>
            Supported by
          </Typography>
          <Link href="https://www.wikimedia.de/" target="_blank" rel="noopener noreferrer">
            <Box
              component="img"
              src="/Wikimedia_Deutschland-Logo.svg"
              alt="Wikimedia Deutschland"
              sx={{ width: 48, height: 48, display: "block" }}
            />
          </Link>
        </Box> */}
      </Box>
    </Box>
  );
};

export default Footer;
