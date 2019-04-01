import React, {useEffect, useRef, useState} from 'react';
import Formsy from 'formsy-react';
import {TextFieldFormsy} from '@fuse';
import {Button, InputAdornment, Icon} from '@material-ui/core';
import {bindActionCreators} from 'redux';
import {withRouter} from 'react-router-dom';
import connect from 'react-redux/es/connect/connect';
import * as authActions from 'app/auth/store/actions';

function JWTRegisterTab(props)
{
    const [isFormValid, setIsFormValid] = useState(false);
    const formRef = useRef(null);

    useEffect(() => {
        if ( props.register.error && (props.register.error.username || props.register.error.password || props.register.error.email) )
        {
            formRef.current.updateInputsWithError({
                ...props.register.error
            });
            disableButton();
        }
    }, [props.register.error]);

    function disableButton()
    {
        setIsFormValid(false);
    }

    function enableButton()
    {
        setIsFormValid(true);
    }

    function handleSubmit(model)
    {
        props.submitRegister(model);
    }

    return (
        <div className="w-full">
            <Formsy
                onValidSubmit={handleSubmit}
                onValid={enableButton}
                onInvalid={disableButton}
                ref={formRef}
                className="flex flex-col justify-center w-full"
            >
                <TextFieldFormsy
                    className="mb-16"
                    type="text"
                    name="displayName"
                    label="Display name"
                    validations={{
                        minLength: 4
                    }}
                    validationErrors={{
                        minLength: 'Min character length is 4'
                    }}
                    InputProps={{
                        endAdornment: <InputAdornment position="end"><Icon className="text-20" color="action">person</Icon></InputAdornment>
                    }}
                    variant="outlined"
                    required
                />

                <TextFieldFormsy
                    className="mb-16"
                    type="text"
                    name="email"
                    label="Email"
                    validations="isEmail"
                    validationErrors={{
                        isEmail: 'Please enter a valid email'
                    }}
                    InputProps={{
                        endAdornment: <InputAdornment position="end"><Icon className="text-20" color="action">email</Icon></InputAdornment>
                    }}
                    variant="outlined"
                    required
                />

                <TextFieldFormsy
                    className="mb-16"
                    type="password"
                    name="password"
                    label="Password"
                    validations="equalsField:password-confirm"
                    validationErrors={{
                        equalsField: 'Passwords do not match'
                    }}
                    InputProps={{
                        endAdornment: <InputAdornment position="end"><Icon className="text-20" color="action">vpn_key</Icon></InputAdornment>
                    }}
                    variant="outlined"
                    required
                />

                <TextFieldFormsy
                    className="mb-16"
                    type="password"
                    name="password-confirm"
                    label="Confirm Password"
                    validations="equalsField:password"
                    validationErrors={{
                        equalsField: 'Passwords do not match'
                    }}
                    InputProps={{
                        endAdornment: <InputAdornment position="end"><Icon className="text-20" color="action">vpn_key</Icon></InputAdornment>
                    }}
                    variant="outlined"
                    required
                />

                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    className="w-full mx-auto mt-16 normal-case"
                    aria-label="REGISTER"
                    disabled={!isFormValid}
                    value="legacy"
                >
                    Register
                </Button>

            </Formsy>

        </div>
    );
}

function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
        submitRegister: authActions.submitRegister
    }, dispatch);
}

function mapStateToProps({auth})
{
    return {
        register: auth.register,
        user    : auth.user
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(JWTRegisterTab));
