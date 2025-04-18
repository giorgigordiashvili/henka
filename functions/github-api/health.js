exports.handler = async function () {
  return {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({
      status: "ok",
      message: "Henka Admin API is running",
      timestamp: new Date().toISOString(),
    }),
  };
};
