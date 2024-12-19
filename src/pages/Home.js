import { Button, Form } from "antd";
import { Link, Navigate } from "react-router-dom";


const Home = () => {
    return (
        <div className="center">
            <Form>
                <h1>
                    Welcome to Finance checker
                </h1>
                <h3>
                    Getting start click below
                </h3>
                <Link Link to={'/login'}>
                    <Button
                        type="primary">
                        Let's go
                    </Button>
                </Link>
            </Form>
        </div >
    )

}
export default Home;