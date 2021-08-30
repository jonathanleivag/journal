export default function state() {
  return {
    isLoading: true,
    entries: [
      {
        id: new Date().getTime(),
        date: new Date().toDateString(),
        text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut, atque sint? Eos eligendi quam, a placeat, aliquid animi vero velit odio dicta, quos quasi sunt veritatis vitae possimus explicabo dignissimos.",
        picture: null,
      },
      {
        id: new Date().getTime() + 1000,
        date: new Date().toDateString(),
        text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut, atque sint? Eos eligendi quam, a placeat, aliquid animi vero velit odio dicta, quos quasi sunt veritatis vitae possimus explicabo dignissimos.",
        picture: null,
      },
      {
        id: new Date().getTime() + 2000,
        date: new Date().toDateString(),
        text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut, atque sint? Eos eligendi quam, a placeat, aliquid animi vero velit odio dicta, quos quasi sunt veritatis vitae possimus explicabo dignissimos.",
        picture: null,
      },
    ],
  };
}
