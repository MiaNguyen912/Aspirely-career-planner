import * as pdfjsLib from "pdfjs-dist";
// @ts-ignore
import pdfjsWorker from "pdfjs-dist/build/pdf.worker.entry";
pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;


import type { TextItem as PdfjsTextItem } from "pdfjs-dist/types/src/display/api";


/**
* Reads a PDF file and returns its text content as a single string.
*
* @example
* const onFileChange = async (e) => {
*     const fileUrl = URL.createObjectURL(e.target.files[0]);
*     const text = await readPdf(fileUrl);
* }
*/


export const readPdf = async (fileUrl: string): Promise<string> => {
 const pdfFile = await pdfjsLib.getDocument(fileUrl).promise;
 let fullText = "";


 for (let i = 1; i <= pdfFile.numPages; i++) {
   // Parse each page into text content
   const page = await pdfFile.getPage(i);
   const textContent = await page.getTextContent();


   // Concatenate all text items from the page
   const pageText = textContent.items
     .map((item) => {
       const { str: text } = item as PdfjsTextItem;
       // Fix the hyphen issue that pdfjs sometimes introduces
       return text.replace(/-­‐/g, "-");
     })
     .join(" ");


   // Add page text to full text with a newline between pages
   fullText += pageText + "\n";
 }


 // Remove any extra whitespace and normalize line endings
 return fullText.trim().replace(/\s+/g, " ");
};
