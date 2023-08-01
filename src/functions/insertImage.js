
import { Quill } from "react-quill";

export function insertImage(event) {
 

    const imageUrl = prompt("Enter image URL:"); // Prompt the user for image URL
    if (imageUrl) {
      const range = this.quill.getSelection();
      if (range) {
        this.quill.insertEmbed(range.index, "image", imageUrl, Quill.sources.USER);
        const imageElement = this.quill.container.querySelector(`img[src="${imageUrl}"]`);
      if (imageElement) {
        // imageElement.style.maxHeight = "300px";
      }
      }
    }
}

