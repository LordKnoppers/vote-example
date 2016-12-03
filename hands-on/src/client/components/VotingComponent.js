// React
import React from 'react';

// Import ChoiceBar
import ChoiceBar from './ChoiceBar';

export default class VotingComponent extends React.Component {
    render() {
        const { vote } = this.props;
        return (
            <div className="Row VotingRow Spacer">
                <div className="Head">
                    <h1 className="Title">
                        {vote.title}
                        <div className="Badge">{vote.totalVotes} Votes</div>
                    </h1>
                    <div className="Description Emphasis">
                        {vote.description}
                    </div>
                </div>
                <div>
                    {vote.choices.map(c => <ChoiceBar key={c.id} {...c} />)}
                </div>
            </div>
        );
    }
}

VotingComponent.propTypes = {
    vote: React.PropTypes.object.isRequired
}