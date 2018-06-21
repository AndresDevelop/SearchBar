import React, { Component } from "react";
import styled from "styled-components";
import { ApiConsumer } from "../ApiConsumer/ApiConsumer";

const SearchInput = styled.input`
  border: 1px solid pink;
  background-color: blue;
  display: block;
  min-width: 200px;
  transition: min-width 250ms ease, background-color 250ms ease;
  padding: 8px 16px;
  &:active,
  &:focus {
    background-color: lightblue;
    min-width: 300px;
    outline: none;
  }
`;
const Wrapper = styled.section`
  padding: 4em;
  background: papayawhip;
`;

let array = [];

class SearchBAr extends Component {
  state = {
    error: false,
    query: " ",
    result: []
  };

  handleQuery = ev =>
    this.setState({
      query: ev.target.value
    });

  RenderInfo = info => {
    const inputValue = this.state.query.toLowerCase();
    const lenghtInput = this.state.query.length;

    let array =
      lenghtInput === 0
        ? []
        : info.filter(
            lan => lan.name.toLowerCase().slice(0, lenghtInput) === inputValue
          );


    return array.map((countries, index) => <h1 key={index}>{countries.name}</h1>);
  };
  render() {
    return (
      <Wrapper>
        <SearchInput placeholder="Search" onChange={this.handleQuery} />
        <ApiConsumer>
          {({ loading, error, data }) => {
            if (loading) {
              return <h1>Loading timeline...</h1>;
            }

            if (error) {
              return <h1>{error.message}</h1>;
            }

            return this.RenderInfo(data);
          }}
        </ApiConsumer>
      </Wrapper>
    );
  }
}

export default SearchBAr;
