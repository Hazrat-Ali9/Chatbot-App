/* eslint-disable @typescript-eslint/no-explicit-any */
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas-pro";

// Color replacement configuration
const COLOR_REPLACEMENTS = {
  // Gradients
  "linear-gradient(to right, #6366F1, #8B5CF6)": "#7367F0", // Purple mix
  "linear-gradient(to right, var(--primary), var(--secondary))": "#7367F0",

  // Modern color functions
  "oklch(var(--primary))": "#6366F1",
  "oklch(var(--secondary))": "#8B5CF6",
  "oklch(var(--accent))": "#EC4899",

  // Semi-transparent
  "rgba(99, 102, 241, 0.8)": "#6366F1",
  "rgba(139, 92, 246, 0.8)": "#8B5CF6",
};

const replaceUnsupportedColors = (element: HTMLElement) => {
  // Replace inline styles
  const style = element.style;
  for (const prop of [
    "background",
    "backgroundColor",
    "color",
    "borderColor",
  ]) {
    if (
      style[prop as any] &&
      Object.keys(COLOR_REPLACEMENTS).some((unsupported) =>
        style[prop as any].includes(unsupported)
      )
    ) {
      let newValue = style[prop as any];
      for (const [unsupported, replacement] of Object.entries(
        COLOR_REPLACEMENTS
      )) {
        newValue = newValue.replace(unsupported, replacement);
      }
      style[prop as any] = newValue;
    }
  }

  // Replace class-based colors by adding inline styles
  const computed = window.getComputedStyle(element);
  if (
    Object.keys(COLOR_REPLACEMENTS).some((unsupported) =>
      computed.background.includes(unsupported)
    )
  ) {
    let background = computed.background;
    for (const [unsupported, replacement] of Object.entries(
      COLOR_REPLACEMENTS
    )) {
      background = background.replace(unsupported, replacement);
    }
    element.style.background = background;
  }
};

export const generateAssessmentPDF = async (
  elementId: string,
  fileName: string
) => {
  try {
    const element = document.getElementById(elementId);
    if (!element) {
      console.error(`Element #${elementId} not found`);
      return;
    }

    // Create a clean clone
    const clone = element.cloneNode(true) as HTMLElement;
    clone.style.position = "fixed";
    clone.style.left = "-9999px";
    clone.style.top = "0";
    clone.style.width = "794px"; // A4 width in pixels
    clone.style.zIndex = "99999";
    document.body.appendChild(clone);

    // Process all elements in the clone
    replaceUnsupportedColors(clone);
    clone
      .querySelectorAll("*")
      .forEach((el) => replaceUnsupportedColors(el as HTMLElement));

    // Remove interactive elements
    clone.querySelectorAll("button, a, [onclick]").forEach((el) => el.remove());

    const canvas = await html2canvas(clone, {
      scale: 2,
      logging: true,
      backgroundColor: "#F5F7FF", // Matches your light background
      useCORS: true,
      allowTaint: true,
      ignoreElements: (el) => el.hasAttribute("data-ignore-pdf"),
    });

    const pdf = new jsPDF("p", "mm", "a4");
    const imgWidth = pdf.internal.pageSize.getWidth();
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    pdf.addImage(canvas, "PNG", 0, 0, imgWidth, imgHeight);
    pdf.save(`${fileName}.pdf`);
  } catch (error) {
    console.error("PDF generation failed:", error);
    alert("Failed to generate PDF. Please try again or contact support.");
  } finally {
    // Clean up
    const clones = document.querySelectorAll('[style*="left: -9999px"]');
    clones.forEach((clone) => document.body.removeChild(clone));
  }
};
