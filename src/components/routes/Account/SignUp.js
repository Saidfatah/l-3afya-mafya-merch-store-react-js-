import React from 'react'

function SignUp() {
    return (
        <div>
            <h1>Register</h1>
            <p>Please fill in the information below:</p>
            <form action=''>
                <input type="text" name="firstname" placeholder="First Name"/>
                <input type="text" name="lastname" placeholder="Last Name"/>
                <input type="email" name="email" placeholder="Email"/>
                <input type="password" name="password" placeholder="Password"/>
                <button type='submit' >CREATE MY ACCOUNT</button>
            </form>
        </div>
    )
}

export default SignUp
