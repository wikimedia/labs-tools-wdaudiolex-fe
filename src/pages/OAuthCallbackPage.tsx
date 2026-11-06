import React, { useEffect, useState } from "react";
import { Alert, Box, Button, CircularProgress, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

import { clearRequestToken, readRequestToken, saveSession } from "../auth/session";
import { apiErrorMessage, exchangeOAuth } from "../services/api";

const OAuthCallbackPage: React.FC = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const query = window.location.search.startsWith("?")
      ? window.location.search.slice(1)
      : window.location.search;
    const params = new URLSearchParams(query);
    const requestToken = readRequestToken();

    if (!requestToken || !params.get("oauth_token") || !params.get("oauth_verifier")) {
      setError("Sign-in did not include a Wikimedia verifier. Return home and start login again.");
      return;
    }

    let cancelled = false;
    exchangeOAuth(requestToken, query)
      .then((session) => {
        if (cancelled) {
          return;
        }
        saveSession(session);
        clearRequestToken();
        navigate("/", { replace: true });
      })
      .catch((err: unknown) => {
        if (!cancelled) {
          setError(apiErrorMessage(err));
        }
      });

    return () => {
      cancelled = true;
    };
  }, [navigate]);

  if (error) {
    return (
      <Box sx={{ maxWidth: 560, mx: "auto", py: 6 }}>
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
        <Button variant="contained" onClick={() => navigate("/")}>
          Back home
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
      <CircularProgress />
      <Typography sx={{ ml: 2 }}>Signing in…</Typography>
    </Box>
  );
};

export default OAuthCallbackPage;
