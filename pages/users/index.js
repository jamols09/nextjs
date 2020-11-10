import React from 'react';
import ReactDOM, { render }from 'react-dom';
import styles from '../../styles/Home.module.css'

class NameForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {  
            name: '',
            lists: [
                {id: 1, name: "Jess"},  
                {id: 2, name: "Jane"},
                {id: 3, name: "Jj"},
                {id: 4, name: "James"}
            ],
            search: "",
            isEdit: false,
            saveId: 0
        }

        this.saveEdit = this.saveEdit.bind(this)
        this.searchItem = this.searchItem.bind(this)
        this.editItem = this.editItem.bind(this)
        this.removeItem = this.removeItem.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    handleSubmit(event) {
        let listArr = [...this.state.lists]
        if(this.state.name !== "") {
            listArr.push({ id: listArr.length+1, name: this.state.name})
            this.setState({ lists: listArr }, () => {
                console.log(this.state.list, 'List Names')
                console.log(listArr, 'listArr')
            })
            this.setState({name: ''})
        }
        
        event.preventDefault()
    }

    handleChange(event) {
        this.setState({ name: event.target.value})
    }

    removeItem(event) {
        // this.setState(prevState => {
        //     lists: prevState.lists.filter(list => list.name !== 'Oliver')
        // })
        let i = parseInt(event.currentTarget.dataset.id)
        this.setState(prevState => {
            const lists = prevState.lists.filter(list => list.id !== i)
            return { lists }
        });
        console.log(this.state.lists)
    }

    editItem(event) {
        let i = parseInt(event.currentTarget.dataset.id)
        let listArr = [...this.state.lists]
        let selItem = listArr.filter(getId => getId.id === i)
        console.log(selItem[0].name)
        this.setState({name: selItem[0].name}) //set the selected name on the input
        this.setState({isEdit: true}) //make editable state true
        this.setState({saveId: selItem[0].id}) //save the id of selected
        event.preventDefault()
    }

    saveEdit() {
        this.setState({isEdit: false})
        let listArr = [...this.state.lists]
        let saveId = this.state.saveId
        // let newArr = listArr.filter(getId => getId.id === saveId)
        // console.log(newArr, "Selected Edit")
        let newList = listArr.map((item) => {
            if(item.id === saveId) {
                console.log(saveId, "SaveId")
                let updatedItem = {
                    ...item,
                    name: this.state.name
                }
                return updatedItem
            }
            return item
        })

        this.setState({lists: newList})
        // console.log(lists,"New List")
    }

    searchItem(event) {
        this.setState({ search: event.target.value })
        console.log(this.state.search)
    }

    render() {
        const dupeList = this.state.lists
        const searchItem = this.state.search.toLowerCase();
        const newData = dupeList.filter(item => {
            return Object.keys(item).some(key => 
                typeof item[key] === "string" && item[key].toLowerCase().includes(searchItem)
            )
        })
        // console.log(newData)
        return (
            <div className={styles.container}>
                <main className={styles.main}>
                    <div className={styles.grid}>
                        <form onSubmit={this.handleSubmit}>
                            <label>
                                <input type="text" name="name" id="name" value={this.state.name} onChange={this.handleChange} />
                            </label>
                            {
                                this.state.isEdit ? <button onClick={this.saveEdit} > Save Edit </button> : <input type="submit" value="Add" />
                            }
                            <div id="items">
                                {/* { 
                                    this.state.lists.map((item) => 
                                        <div key={item.name} className="show">
                                            <span key={item.id} data-id={item.id} > {item.name} </span> 
                                            <button data-id={item.id} onClick={this.editItem} className="hide" > Edit </button>{' '}
                                            <button data-id={item.id} onClick={this.removeItem} className="hide" > Delete </button>
                                        </div>
                                    )
                                } */}
                                {
                                    newData.map((item) => 
                                        <div key={item.name} className="show">
                                            <span key={item.id} data-id={item.id} > {item.name} </span> 
                                            <button data-id={item.id} onClick={this.editItem} className="hide" > Edit </button> {' '}
                                            <button data-id={item.id} onClick={this.removeItem} className="hide" > Delete </button>
                                        </div>
                                    ) 
                                }
                            </div>

                            <input type="text" name="filter" id="filter" value={this.state.filter} onChange={this.searchItem} />{' '}Filter 
                        </form>
                    </div>
                </main>
            </div>
        );
    }
}

export default NameForm


// function Names() {
//     return (
//         <div className={styles.container}>
//             <main className={styles.main}>
//                 <div className={styles.grid}>
//                     <form>
//                         <label>
//                             Name: {' '}
//                             <input type="text" name="name" />
//                         </label>
//                         <input type="submit" value="Submit" />
//                     </form>
//                 </div>
//             </main>
//         </div>
//     )
// }

// export default Names