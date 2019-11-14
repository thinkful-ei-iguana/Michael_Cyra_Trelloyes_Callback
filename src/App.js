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

  // deleteAllOfId = id => {
  //   // const newCards = Object.values(this.state.store.allCards);
  //   // console.log(newCards);
  //   // newCards.filter(newCards.cardId => newCards.cardId !== newCards.id);
  //   // console.log(newCards);
  //   // this.setState({
  //   //   Store: { allCards: newCards }
  //   // });
  // };

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
            />
          ))}
        </div>
      </main>
    );
  }
}

export default App;
