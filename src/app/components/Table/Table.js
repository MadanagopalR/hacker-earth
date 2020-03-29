import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

class Table extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  getColumnTitles = (columnTitles) => {
    const returnArray = [];
    columnTitles.forEach((columnTitle, index) => { /* eslint-disable */
        if (!columnTitle.hideCell) {
            returnArray.push(
                <th>
                    {columnTitle.value}
                </th>
            );
        }
    });
    return returnArray;
  }

  getDescription = (row) => {
    const timeStart = new Date(row.created_at);
    const timeEnd = new Date();
    let diff =(timeEnd.getTime() - timeStart.getTime()) / 1000;
    diff = diff / (60 * 60);
    const diffHours = Math.abs(Math.round(diff));
    const url = row.url ? new URL(row.url) : {};
    return (
      <p>{row.title} (
        <a href={url.href}>{url.hostname}</a>
      ) by {row.author} {diffHours} hours ago [<span id={row.objectID} onClick={this.props.hide} className="link"> hide </span>]</p>
    )
  }

  getRows = (rowData) => {
    const tableRows = [];
    rowData.forEach((row, index) => {
      tableRows.push (
        <tr className="row" key={`${index}-row`}>
          <td className="cell align-center-text">{row.num_comments}</td>
          <td className="cell align-center-text">{row.points}</td>
          <td className="cell"><div id={row.objectID} className="arrow-up link" onClick={(evt) => this.props.upVote(evt)}></div></td>
          <td className="cell">{this.getDescription(row)}</td>
        </tr>
      );
    });
    return tableRows;
  }

  render() {
    const { columnTitles, rowData } = this.props;
    return (
      <Fragment>
        <table className="specialTermsTable">
            <thead className="columnHeader">
                <tr>{this.getColumnTitles(columnTitles)}</tr>
            </thead>
            <tbody>
                {this.getRows(rowData)}
            </tbody>
        </table>
      </Fragment>
    );
  }
}

Table.propTypes = {
  columnTitles: PropTypes.array,
  rowData: PropTypes.array,
  hide: PropTypes.func,
  upVote: PropTypes.func
}

Table.defaultProps = {
  columnTitles: [],
  rowData: [],
  hide: () => {},
  upVote: () => {}
}

export default Table;
