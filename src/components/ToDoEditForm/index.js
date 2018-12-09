import React, { Component } from 'react';
import { get, update } from '../../helpers/toDoItemApi';
import { Formik } from 'formik';

class ToDoEditForm extends Component {
    state = {
        toDoItem: null,
        fetched: false
    }

    componentDidMount = async () => {
        const toDoItem = await get(this.itemId());
        this.setState({toDoItem, fetched: true})
    }

    itemId = () => this.props.match.params.itemId
    
    render() {
        return(
            <div>
                Edit form for {this.itemId()}
                {this.state.fetched
                    ? <Formik 
                        initialValues={{...this.state.toDoItem}}
                        onSubmit={(values) => {
                            update(this.itemId(), {...values})
                        }}
                        render={({
                            values,
                            errors,
                            touched,
                            handleBlur,
                            handleChange,
                            handleSubmit,
                            isSubmitting
                        }) => (
                            <form onSubmit={handleSubmit}>
                                <input 
                                    name="content" 
                                    onChange={handleChange}
                                    value={values.content}
                                />
                                <br/>
                                <button type="submit">Update</button>
                            </form>
                        )}
                     />
                    : <p>Item loading...</p>
                }
            </div>
        )
    }
}

export default ToDoEditForm