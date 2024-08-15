export const Bad = (message: string) => {
  return new Response(
    JSON.stringify({
      message,
    }),
    { status: 400 }
  );
};

export const Unauthorized = (message: string) => {
  return new Response(
    JSON.stringify({
      message,
    }),
    { status: 401 }
  );
};

export const NotFound = (message: string) => {
  return new Response(
    JSON.stringify({
      message,
    }),
    { status: 404 }
  );
};

export const ServerError = (message: string) => {
  return new Response(
    JSON.stringify({
      message,
    }),
    { status: 500 }
  );
};

export const Ok = (data: any) => {
  return Response.json({
    message: "ok",
    data,
  });
};

export const Created = (data: any) => {
  return new Response(
    JSON.stringify({
      message: "ok",
      data,
    }),
    { status: 201 }
  );
};
