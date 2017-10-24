import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Card, CardHeader, CardText} from 'material-ui/Card';
import * as sagaActions from './saga';

class Landing extends Component {
    componentDidMount() {
        this.props.mounted && this.props.mounted(this.props.match.params.name);
    }

    render() {
        const name = this.props.match.params.name;

        if (!(name in this.props.persons.person)) {
            return <div>Loading</div>;
        }

        const details = this.props.persons.person[name];
        return (
            <article>
                <Card>
                    <CardHeader>
                    {name}
                    </CardHeader>
                    <CardText>
                        {JSON.stringify(details)}
                    </CardText>
                </Card>
            </article>
        );
    }
}

export default connect(state => ({
    persons: state.persons,
}), {
    ...sagaActions,
})(Landing);
