import React, { Component } from "react";
import List from "./List";
import "./App.css";

class App extends Component {
  static defaultProps = {
    store: {
      lists: [],
      allCards: {}
    }
  };
  state = {
    store: this.props.store
  };

  deleteFunction = id => {
    const newCards = Object.values(this.state.store.allCards);
    console.log(newCards);
    newCards.filter(newCards.cardId => newCards.cardId !== newCards.id);
    console.log(newCards);
    this.setState({
      Store: { allCards: newCards }
    });
  };

  render() {
    return (
      <main className="App">
        <header className="App-header">
          <h1>Trelloyes!</h1>
        </header>
        <div className="App-list">
          {this.state.store.lists.map(list => (
            <List
              key={list.id}
              header={list.header}
              cards={list.cardIds.map(id => this.state.store.allCards[id])}
              delete={this.deleteFunction}
            />
          ))}
        </div>
      </main>
    );
  }
}

export default App;
