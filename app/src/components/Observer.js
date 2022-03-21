import React from "react";

class Observer extends React.Component {
  /*
        Implements observer pattern for React to listen on NES screen updates
    */
  constructor(props) {
    super(props);

    if (this.notify === undefined) {
      throw new Error("You need to overwrite notify");
    }
  }
}

export default Observer;
