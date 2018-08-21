function isEmpty(val) {
  // console.log(
  //   "validation: " +
  //     val +
  //     " " +
  //     (val === undefined ||
  //       val === null ||
  //       (typeof val === "object" && Object.keys(val).length === 0) ||
  //       (typeof val === "string" && val.trim().length == 0))
  // );
  return (
    val === undefined ||
    val === null ||
    (typeof val === "object" && Object.keys(val).length === 0) ||
    (typeof val === "string" && val.trim().length === 0)
  );
}

// //same function as isEmpty
// const isStringEmpty = val => {
//   return (
//     val === undefined ||
//     val === null ||
//     (typeof val === "object" && Object.keys(val).length === 0) ||
//     (typeof val === "string" && val.trim().length === 0)
//   );
// };

export default isEmpty;
