export default defineEventHandler(async (event) => {
    const body = await readBody(event);
  
    const submitUrl = `https://formspree.io/f/xgejjbzg`;
    let response = null;
    await $fetch(submitUrl, {
      method: 'post',
      body: {
        name: body.name,
        email: body.email,
        message: body.message,
      },
    })
      .then((data) => {
        response = data;
      })
      .catch(() => {
        response = 'error';
      });
    return { response };
  });
  