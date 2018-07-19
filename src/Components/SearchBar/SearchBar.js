import React, { Component } from "react";
import styled, { keyframes } from "styled-components";
import { ApiConsumer } from "../ApiConsumer/ApiConsumer";

const SearchInput = styled.input`
  border: none;
  box-sizing: border-box;
  background-color: #f5f5f5;
  display: block;
  width: 0px;
  padding: 8px 16px;
  border-bottom:0px;
  transition: width 250ms ease, border-bottom 250ms ease;
  &:active,
  &:focus {
    width: 300px;
    outline: none;
    border-bottom:1px solid blue;

  }

`;

const AutoComplete = styled.div`
  position: absolute;
  border: 1px solid #d4d4d4;
  border-bottom: none;
  border-top: none;
  z-index: 99;
  right: 0;
  display: grid;
  max-width: 300px;
  width: 300px;
  top: 55px;
  box-sizing: border-box;
  margin-right: 15%;
  animation-name: ${keyframesAnimation};
  animation-duration: 2s;
`;

const keyframesAnimation = keyframes`

  0%{
    transform: scaleY(0);
  }

  100%{

    transform : scaleY(1);

  }
`;

const Suggestion = styled.span`
  padding: 10px;
  cursor: pointer;
  background-color: #fff;
  border-bottom: 1px solid #d4d4d4;
  animation-name: ${keyframesAnimation};
  transform-origin: top center;
  animation-duration: 0.5s;

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

const IGIcon = styled.i`
  position: absolute;
  right: 0px;
  color:blue;
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

            <SearchInput
              placeholder="Search for DR Name, Symbol"

              onChange={this.handleQuery}
            />
            <IGIcon className="fa fa-search" />
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
