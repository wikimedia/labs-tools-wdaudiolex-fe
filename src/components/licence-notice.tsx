import React from "react";
import { Link, Typography } from "@mui/material";

export const WIKIDATA_CC0_URL = "https://creativecommons.org/publicdomain/zero/1.0/";

interface LicenceNoticeProps {
  /**
   * Optional custom class name or SX styling props.
   */
  className?: string;
}

/**
 * Notice displayed alongside Wikidata edit confirmations, stating that
 * the edit will be published under the Creative Commons CC0 licence.
 */
export const LicenceNotice: React.FC<LicenceNoticeProps> = () => {
  return (
    <Typography variant="body2" sx={{ color: "text.secondary", mt: 1 }}>
      By confirming, you agree that your Wikidata edit is published under the{" "}
      <Link
        href={WIKIDATA_CC0_URL}
        target="_blank"
        rel="noopener noreferrer"
      >
        Creative Commons CC0 Licence
      </Link>
      .
    </Typography>
  );
};

export default LicenceNotice;
