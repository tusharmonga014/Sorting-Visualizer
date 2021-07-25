import ALGORITHMS from "./ALGORITHMS";

/**
 * Return algorithm object of specified Id
 * @param {*} algorithmId Algorithm Id
 */
function getAlgorithmById(algorithmId) {

    // If valid algorithm is selected, return its object
    for (let algorithmsIterator = 0; algorithmsIterator < ALGORITHMS.length; algorithmsIterator++) {
        if (ALGORITHMS[algorithmsIterator].id === algorithmId) {
            return ALGORITHMS[algorithmsIterator];
        }
    }

    // If algorithm Id doesn't match with any present Ids
    console.log('No matching algorithm found with Id : "' + algorithmId + '"');
    return {};
}

export default getAlgorithmById;