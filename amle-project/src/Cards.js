import React, {useEffect, useState} from 'react';
import {orig_recipes} from './ApiData'; // import the json
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Accordion} from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Alert from 'react-bootstrap/Alert';
import ListGroup from 'react-bootstrap/ListGroup';


function CardDisplay(){

    const [recipes, setRecipe ] = useState(orig_recipes);
    const [trigger, setTrigger] = useState(0);
    const [prepared, setPrepared ] = useState(false);
    const [activeModal, setActiveModal] = useState(null);   
    

    function showModal(modalId) {
        setActiveModal(modalId);
    };

    function hideModal(){
        setActiveModal(null);
    };

    /*function ingredientClick(title,index) {
        for (let i = 0; i < recipes.length; i++) {
            if(recipes[i].title === title){
                for(let j = 0; j < recipes[i].ingredients.length; j++){
                    if (j === index) {
                        recipes[i].ingredients[index].prepared = !recipes[i].ingredients[index].prepared
                        setRecipe(recipes);
                        setTrigger(trigger + 1);
                    }
                }   
            }
        }
    }*/

    // useEffect hook to perform side effects in the component
    useEffect(() => {
        console.log(recipes);
    
        let allPrepared = false;
    
        for (let i = 0; i < recipes.length; i++) {
            let prepared = true;
    
            if (recipes[i].ingredients) {
                for (let j = 0; j < recipes[i].ingredients.length; j++) {
                    if (!recipes[i].ingredients[j].prepared) {
                        prepared = false;
                        break;
                    }
                }
            }
    
            if (prepared) {
                allPrepared = true;
                break;
            }
        }
    
        setPrepared(allPrepared); // Update the prepared state
    }, [trigger]); // Only depend on `trigger`

    

    const cards = orig_recipes.map((recipe, index) => { 
        return (
            <Col key={index}>
                <Card style={{ width: '20rem' }}>
                    <Card.Img variant="top" src={recipe.imageUrl} />
                    <Card.Body>
                        <Card.Title>
                        </Card.Title>
                        <Card.Text>
                            {recipe.description}
                        </Card.Text>
                        <Button variant="primary" onClick={() => showModal(`${index}myModal`)}>Show Details</Button>
                    </Card.Body>
                </Card>

                <Modal id={`${index}myModal`} show={activeModal === `${index}myModal`} onHide={hideModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>{recipe.title}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        
                        { prepared ? <Alert variant='success'><Alert.Heading>Prep work done!</Alert.Heading></Alert> : <Alert variant='danger'><Alert.Heading>Just keep chopping</Alert.Heading></Alert>}
                    </Modal.Body>
                </Modal>
            </Col>
        );
    });
    return(
        <Container>
            <h1>{orig_recipes}</h1>
            <Row>
                {cards}
            </Row>
        </Container>
    )
}

export default CardDisplay;