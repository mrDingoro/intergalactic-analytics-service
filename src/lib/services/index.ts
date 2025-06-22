const mainService = {
  aggregate: async (file: File, rows: number = 10000) => {
    const formData = new FormData();

    formData.append('file', file);

    const response = await fetch(`${import.meta.env.VITE_API_URL}/aggregate?rows=${rows}`, {
      method: 'POST',
      body: formData,
    });

    return response;
  },

  report: async (
    size: number = 0.01,
    withErrors: boolean = false,
    maxSpend: number = 1000,
  ): Promise<Response> => {
    const response = await fetch(
      `${
        import.meta.env.VITE_API_URL
      }/report?size=${size}&withErrors=${withErrors}&maxSpend=${maxSpend}`,
      {
        method: 'GET',
      },
    );

    return response;
  },
};

export default mainService;
