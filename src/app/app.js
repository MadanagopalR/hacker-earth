import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchAllNews } from './actions/newsActions';
import Navbar from './components/Navbar/Navbar';
import Table from './components/Table/Table';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';

let pageNumber = 1;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      news: [],
      onload: true,
      more: false
    };
    this.hideRow = this.hideRow.bind(this);
  }
  componentDidMount() {
    this.props.fetchNews(pageNumber);
  }
  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.onload && isEmpty(prevState.news)) {
      return {
        news: get(nextProps.news, 'hits', [])
      };
    } else if (prevState.more && nextProps.news.hits !== prevState.news){
      return {
        news: prevState.news.concat(get(nextProps.news, 'hits', [])),
        onload: false
      }
    }
    return null;
  }
  hideRow = (evt) => {
    const { news } = this.state;
    const array = news.filter(x => x.objectID !== evt.target.id);
    this.setState({ news: array, onload: false, more: false });
  }
  upVote = (evt) => {
    const { news } = this.state;
    const array = news.map(x => {
      if (x.objectID === evt.target.id) {
        x.points += 1;
      }
      return x;
    });
    this.setState({ news: array, onload: true, more: false });
  }
  showNextRecords = () => {
    pageNumber += 1;
    this.props.fetchNews(pageNumber);
    this.setState({ onload: false, more: true });
  }
  render() {
    const { news } = this.state;
    return (
      <div className="App">
        <Navbar />
        <Table rowData={ news } hide={this.hideRow} upVote={this.upVote}/>
        <p className="App-link" onClick={this.showNextRecords}> More </p>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
  news: state.news.news
})

const mapDispatchToProps = dispatch => {
  return {
    fetchNews:(pageNumber) =>{
      dispatch(fetchAllNews(pageNumber));
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
