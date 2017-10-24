import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

export default class Layout extends Component {
    render() {
        return (
            <MuiThemeProvider>
                <AppBar title="Darrell!" />
                <article>
                    {this.props.children}
                </article>
            </MuiThemeProvider>
        );
    }
}
