import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as sagaActions from './saga';
import { Link } from 'react-router-dom';

class Landing extends Component {
    componentDidMount() {
        this.props.mounted && this.props.mounted();
    }

    render() {
        return (
            <article>
                <header>
                    <h2>What is Darrell!?</h2>
                    <p>Darrell!!!</p>
                </header>
                <section>
                    {this.props.persons.persons.map((p, i) => (
                        <div>
                            <Link to={`/person/${encodeURIComponent(p._fields[0].properties.name)}`}>{p._fields[0].properties.name}</Link>
                        </div>
                    ))}
                </section>
            </article>
        );
    }
}

export default connect(state => ({
    persons: state.persons,
}), {
    ...sagaActions,
})(Landing);
