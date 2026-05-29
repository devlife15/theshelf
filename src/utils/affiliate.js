/**
 * Global Outbound Link Utility for Affiliate Content Tracking
 * @param {string} url - Target Destination URL
 */
export const goToAffiliate = (url) => {
  if (!url) return;
  // Pluggable analytics injection layer can be dropped here
  window.open(url, "_blank", "noopener,noreferrer");
};
