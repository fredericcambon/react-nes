import React from 'react';

class Root extends React.Component {

    render() {
        return (
            <div>
                {this.props.children}

                <footer>
                    <p className="text-center">© 2017 NES Emulator. · <a href="#">Privacy</a> · <a href="#">Terms</a></p>
                </footer>
            </div>
        )
    }
}

export default Root
