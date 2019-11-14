import React, { Component } from "react";
import List from "./List";
import "./App.css";
import STORE from "./STORE";

function omit(obj, keyToOmit) {
  return Object.entries(obj).reduce(
    (newObj, [key, value]) =>
      key === keyToOmit ? newObj : { ...newObj, [key]: value },
    {}
  );
}

const newRandomCard = () => {
  const id =
    Math.random()
      .toString(36)
      .substring(2, 4) +
    Math.random()
      .toString(36)
      .substring(2, 4);
  return {
    id,
    title: `Random Card ${id}`,
    content: "lorem ipsum"
  };
};

class App extends Component {
  static defaultProps = {
    store: {
      lists: [],
      allCards: {}
    }
  };
  state = {
    store: STORE
  };

  deleteFunction = cardId => {
    const { lists, allCards } = this.state.store;

    const newLists = lists.map(list => ({
      ...list,
      cardIds: list.cardIds.filter(id => id !== cardId)
    }));

    const newCards = omit(allCards, cardId);

    this.setState({
      store: {
        lists: newLists,
        allCards: newCards
      }
    });
  };

  randomCard = listId => {
    const newCard = newRandomCard();
    const newList = this.state.store.lists.map(list => {
      if (list.id === listId) {
        return { ...list, cardIds: [...list.cardIds, newCard.id] };
      }
      return list;
    });

    this.setState({
      store: {
        lists: newList,
        allCards: { ...this.state.store.allCards, [newCard.id]: newCard }
      }
    });
  };

  render() {
    const { store } = this.state;
    return (
      <main className="App">
        <header className="App-header">
          <h1>Trelloyes!</h1>
        </header>
        <div className="App-list">
          {this.state.store.lists.map(list => (
            <List
              listNum={list.id}
              key={list.id}
              header={list.header}
              cards={list.cardIds.map(id => store.allCards[id])}
              delete={this.deleteFunction}
              random={this.randomCard}
            />
          ))}
        </div>
      </main>
    );
  }
}

export default App;
