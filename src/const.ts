/* eslint-disable @typescript-eslint/naming-convention */
export const types = (language = "EN", codeLanguage: string, _type: string) => {
  const type: any = {
    ES: {
      MARKDOWN: "Crea un readme que explique con títulos y ejemplos este código: ",
      COMMENTARIES: "Agrega comentarios que explique este código: ",
    },
    EN: {
      MARKDOWN:
        "Make a readme explain with titles and some examples with this code (use ``` to do the examples):",
      COMMENTARIES: `Add comments that explain this code: `,
    },
  };
  return type[language][_type];
};

export const language = "EN";
