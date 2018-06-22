import React, { Component } from "react";
import styled from "styled-components";
import { ApiConsumer } from "../ApiConsumer/ApiConsumer";

const SearchInput = styled.input`
  border: 1px solid #efefef;
  box-sizing: border-box;
  background-color: #fafafa;
  display: block;
  min-width: 300px;
  padding: 8px 16px;
`;

const AutoComplete = styled.div`
  position: absolute;
  border: 1px solid #d4d4d4;
  border-bottom: none;
  border-top: none;
  z-index: 99;
  right: 0;
  display: grid;
  min-width: 300px;
  top: 55px;
  box-sizing: border-box;
  margin-right: 15%;
`;

const Suggestion = styled.span`
  padding: 10px;
  cursor: pointer;
  background-color: #fff;
  border-bottom: 1px solid #d4d4d4;

  &:hover {
    background-color: #e9e9e9;
  }
`;

const Logo = styled.img`
  width: 141px;
  height: 50px;
  cursor: pointer;
`;

const Header = styled.header`
  position: relative;
  width: 100%;
  z-index: 20;
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 70%;
  height: 78px;
  margin: 0 auto;
`;

const Hero = styled.img`
  width: 100vw;
  height: 100vh;
  object-fit: cover;
  overflow: hidden;
`;

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

    return (
      <AutoComplete>
        {array.map((countries, index) => (
          <Suggestion key={index}>{countries.name}</Suggestion>
        ))}
      </AutoComplete>
    );
  };
  render() {
    return (
      <div>
        <div style={{ backgroundColor: "#f5f5f5" }}>
          <Header>
            <Logo src="http://interbrand.com/assets/00000001535.png" />
            <SearchInput placeholder="Search" onChange={this.handleQuery} />
          </Header>
        </div>

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
      </div>
    );
  }
}

export default SearchBAr;
