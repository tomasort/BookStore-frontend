const AuthorDetailsForm = () => {
    return (
        <div className="grid grid-cols-1">
            <form>
                <label htmlFor="name" className="block">
                    <span>Name</span>
                    <input type="text" id="name" name="name" />
                </label>
                <label htmlFor="id" className="block">
                    <span>ID</span>
                    <input type="text" id="id" name="id" />
                </label>
            </form>
        </div>
    )
}

export default AuthorDetailsForm
