import React, {Component} from 'react';
import uuid from 'uuid';
import './TagStatistics.css';

class TagStatistics extends Component {
    mapHashTable() {
        const object = this.props.tagStats;
        const arrayWithTagData = [];
        for (let key in object) {
            arrayWithTagData.push({
                id: uuid(),
                name: key,
                occurenceCount: object[key]
            });
        }
        arrayWithTagData.sort((first, second) => -1 * (first.occurenceCount - second.occurenceCount));
        return arrayWithTagData.slice(0, 10);
    }

    render() {
        return (
            <div className="TagStatistics">
                <span className="header">Tag stats of all time:</span>
                <table>
                    <thead>
                    <tr>
                        <th>Tag Name</th>
                        <th>Occurrences</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.mapHashTable().map(tag => (
                        <tr key={tag.id}>
                            <td>{tag.name}</td>
                            <td>{tag.occurenceCount}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default TagStatistics;