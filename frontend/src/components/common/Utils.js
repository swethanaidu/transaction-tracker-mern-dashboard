export const restructuredList = (data) => {
    return data?.map(item => {
        return {
              _id: item._id,
              name: item.name,
        };
      });
}


export const getFormatedCurrency = (data) => {
    return new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
    }).format(data);
}

export const getDataTruncate = (str) => {
    return str.length > 20 ? str.substring(0, 20) + "..." : str;
}

 