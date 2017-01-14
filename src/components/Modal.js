import React from 'react';

class Modal extends React.Component {
    constructor( props ) {
        super( props );
    }

    componentWillReceiveProps( props ) {
        if ( props.show ) {
            $( this.refs.modal ).modal( 'show' );
        }
    }

    render() {
        return (
            <div ref="modal" className="modal fade" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div className="modal-dialog" role="document">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">{this.props.title}</h5>
                    <button type="button" className="close" onClick={this.props.onClose} data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div className="modal-body">
                      {this.props.children}
                  </div>
                </div>
              </div>
            </div>
        )
    }
}

export default Modal
