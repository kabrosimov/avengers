import './charSearch.css';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useState } from 'react';
import * as Yup from 'yup';
import useMarvelService from '../../services/MarvelService';
import { Link } from 'react-router-dom';
// const isValid = true;

const CharSearch = () => {
    const [char, setChar] = useState(null);
    const { getCharacterByName, clearError } = useMarvelService();

    const searchChar = async name => {
        clearError();
        await getCharacterByName(name).then(onCharLoaded);
        // setChar(null);
        // this.foo.bar = 0;
    };
    const onCharLoaded = char => {
        setChar(char);
        // this.setState({ char, loading: false });
    };
    // const input = document.getElementById('findtext');
    // console.log(input);
    const successForm = char?.name ? <SuccessForm name={char?.name} /> : null;
    const someMessage =
        char?.name === '' ? (
            <div className="search_message error_color">
                The character was not found. Check the name and try again
            </div>
        ) : null;
    return (
        <Formik
            initialValues={{
                findtext: '',
            }}
            validationSchema={Yup.object({
                findtext: Yup.string()
                    .required('This field is required')
                    .min(4, '4 symbols minimum'),
            })}
            onSubmit={values => searchChar(values.findtext)}
        >
            <>
                <div className="char__search__form">
                    {/* <div className="char__search__form"> */}
                    <p>Or find a character by name:</p>
                    <Form>
                        <div className="char__search__form__basics">
                            <div>
                                <Field
                                    id="findtext"
                                    name="findtext"
                                    placeholder="Enter here"
                                />
                            </div>

                            <div className=".char__search__btns">
                                <button
                                    className="button button__main"
                                    type="submit"
                                >
                                    <div className="inner">Find</div>
                                </button>
                            </div>
                        </div>
                        <ErrorMessage
                            name="findtext"
                            component="div"
                            className="search_message error_color"
                        />
                    </Form>

                    {successForm}
                    {someMessage}
                </div>
                {/* </Form> */}
            </>
        </Formik>
    );
};

const SuccessForm = props => {
    return (
        <div className="char__search__form__basics">
            <div className="search_message success_color">
                There is! Visit {props.name} page?:
            </div>
            <div>
                <Link
                    to={`/characters/${props.name}`}
                    className="button button__secondary"
                >
                    <div className="inner">To page</div>
                </Link>
            </div>
        </div>
    );
};

export default CharSearch;
