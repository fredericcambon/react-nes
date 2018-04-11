import React from 'react';

class Root extends React.Component {

    render() {
        return (
          <div className="cover-container d-flex h-100 p-3 mx-auto flex-column">
            {this.props.children}

            <footer>
              <p className="text-center">© 2017 NES Emulator. · <a href="#">Privacy</a> · <a href="#">Terms</a></p>
            </footer>
          </div>
        )
    }
}

export default Root
