import React from "react";

import withLoader from "./withLoader";
import withHover from "./withHover";
import useHover from "../hooks/useHover";

// import useDogImages from "../hooks/useDogImages";
// function DogImages() {
//   const dogs = useDogImages();
//   return dogs.map((dog, i) => <img src={dog} key={i} alt="Dog" />);
// }

// function DogImages(props) {
//   const [hoverRef, hovering] = useHover();
//   return (
//     <div ref={hoverRef} {...props}>
//       {hovering && <div id="hover">Hovering!</div>}
//       <div id="list">
//         {props.data.message.map((dog, index) => (
//           <img src={dog} alt="Dog" key={index} />
//         ))}
//       </div>
//     </div>
//   );
// }

// export default withLoader(
//   DogImages,
//   "https://dog.ceo/api/breed/labrador/images/random/6"
// );


function DogImages(props) {
  return (
    <div {...props}>
      {props.hovering && <div id="hover">Hovering!</div>}
      <div id="list">
        {props.data.message.map((dog, index) => (
          <img src={dog} alt="Dog" key={index} />
        ))}
      </div>
    </div>
  );
}

export default withHover(
  withLoader(
    DogImages,
    "https://dog.ceo/api/breed/labrador/images/random/6"
  )
)