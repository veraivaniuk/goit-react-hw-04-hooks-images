import Button from "../Button/Button";
import { Component, useState } from "react";


export default function Searchbar({onSubmit}) {
   const [query, setQuery] = useState('');

  const handleChangeName = (e) => {
    setQuery(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(query);
    onSubmit(query);
    setQuery('');
  };


  return (
    <header className="Searchbar">
      <form className="SearchForm" onSubmit={handleSubmit}>
        <input
          className="SearchForm-input"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={query}
          onChange={handleChangeName}
        />
        <Button buttonName="Search" />
      </form>
    </header>
  );
}


// class Searchbar extends Component {
//   state = {
//     query: "",
//   };

//   handleChangeName = (e) => {
//     this.setState({ query: e.target.value });
//   };

//   handleSubmit = (evt) => {
//     evt.preventDefault();
//     this.props.onSubmit({ ...this.state });
//     this.reset();
//   };

//   reset() {
//     this.setState({
//       query: "",
//     });
//   }

//   render() {
//     const { query } = this.state;

//     return (
//       <header className="Searchbar">
//         <form className="SearchForm" onSubmit={this.handleSubmit}>
//           <input
//             className="SearchForm-input"
//             type="text"
//             autoComplete="off"
//             autoFocus
//             placeholder="Search images and photos"
//             value={query}
//             onChange={this.handleChangeName}
//           />
//           <Button buttonName="Search" />
//         </form>
//       </header>
//     );
//   }
// }

// export default Searchbar;
