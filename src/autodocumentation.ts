/* eslint-disable @typescript-eslint/naming-convention */
import { types } from "./const";
import axios from "axios";

export const API_KEY = "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";

export const HEADERS = {
  Authorization: `Bearer ${API_KEY}`,
  "Content-Type": "application/json",
};

export const commentaries = async (
  code: string,
  type = types("EN", "javascript", "COMMENTARIES")
) => {
  try {
    console.log("llega a commentaries");

    const response = await axios.post(
      "https://api.openai.com/v1/edits",
      {
        model: "code-davinci-edit-001",
        input: code,
        instruction: type,
        temperature: 0.2,
        top_p: 0,
      },
      {
        headers: HEADERS,
      }
    );
    return response.data.choices[0].text;
  } catch (error) {
    console.log("error: ",error);
    return code;
  }
};
