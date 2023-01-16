import { HEADERS } from "./autodocumentation";
import axios from "axios";
import { types } from "./const";

export const markdownRequest = async (
  code: string,
  type = types("EN", "javascript", "MARKDOWN")
) => {
  try {
    const response = await axios.post(
      "https://api.openai.com/v1/completions",
      {
        model: "text-davinci-003",
        prompt: `${type} \n ${code}`,
        temperature: 0,
        max_tokens: 2000,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      },
      {
        headers: HEADERS,
      }
    );
    console.log("response: ", response.data.choices[0].text);
    return response.data.choices[0].text;
  } catch (error) {
    console.log("error: ", error);
    return code;
  }
};
