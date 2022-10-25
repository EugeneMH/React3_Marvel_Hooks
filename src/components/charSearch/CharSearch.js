import useMarvelService from '../../services/service';

import { useState } from 'react';

import { NavLink } from 'react-router-dom';

import { Formik, Form, Field, ErrorMessage as FormikErrorMessage} from 'formik';
import * as Yup from 'yup';

import './charSearch.scss';

const CharSearch = () => {
    const [char, setChar] = useState(null);

    const {loading, error, getCharacterByName, clearError} = useMarvelService();

    const updateChar = (name) => {
        clearError()

        getCharacterByName(name)
            .then(res => res ? setChar(res): null)
    }

    const results = () => {
        if (char === 'not found') {
            return (
                <div className="wrapper__not-found">
                    The character was not found. Check the name and try again. 
                    <br/>*The search is case-sensitive
                </div> 
            )
        } else if (char) {
            return (
                <div className="wrapper__found">
                    <div>Character found! Visit {char.name}'s page?</div>
                    <NavLink 
                        to={`./characters/${char.name}`}
                        className={({ isActive }) => 
                      ({color: isActive ? '#9F0013' : 'inherit'})}>
                        <button className="button button__secondary">
                            <div className="inner">To Page</div>
                        </button>
                    </NavLink>  
                </div> 
            )
        }
    }   
        
    const loadingMessage = loading ? 'loading...' : null;
    const errorMessage = !loading && error ? 'error' : null;
        
    return (
        <div className='form'>
            <Formik 
                initialValues={{
                    charName: ''
                }}
                validationSchema={Yup.object({
                    charName: Yup.string()
                        .required('Obligatory field')
                })}
                onSubmit = {({charName}) => {
                    updateChar(charName);
                }}>
                    {formik => (
                        <Form onSubmit={formik.handleSubmit}>
                            <label className="label" htmlFor="search">Or find a character by name:</label>
                            <div className="wrapper">
                                <Field
                                    className="input"
                                    type="text"
                                    name="charName"
                                    id="charName"
                                    placeholder="Enter name"/>
                                <button type="submit" className="button button__main">
                                    <div className="inner">Find</div>
                                </button>
                            </div>
                            <FormikErrorMessage component="div" className="wrapper__not-found" name="charName" />
                        </Form>
                    )}
            </Formik>
            {results()}
            {loadingMessage}
            {errorMessage}
        </div>
    )
}

export default CharSearch;