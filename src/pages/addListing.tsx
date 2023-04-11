import Footer from "../components/Footer";
import ListingForm from "../components/ListingForm";
import NavbarComponent from "../components/NavbarComponent";

const addListing = ({editItem}: {editItem: any}) => {
    return (
        <main>
            <NavbarComponent />
            <ListingForm editItem={editItem}/>
            <Footer />
        </main>
    )
}


export default addListing;