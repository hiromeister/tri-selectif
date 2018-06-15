import React from "react";
import { connect } from "react-redux";
import { fetchApi } from "./actions"

class ChoiceList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedGarbage: [],
            selectedBean: [],
            assignedGarbage: [],
            score: 0
        }
        this.handleSelectGarbage = this.handleSelectGarbage.bind(this);
    }


    componentDidMount() {
        this.props.dispatch(fetchApi());
    }

    handleSelectGarbage(evt, item) {
        this.setState({
            selectedGarbage: item
        })
    }

    assignGarbageToBean() {
        this.state.selectedGarbage.assignedTo = this.state.selectedBean.type;
        this.setState({
            assignedGarbage: this.state.selectedGarbage,
        })
    }

    compare() {
        if (this.state.assignedGarbage.type === this.state.assignedGarbage.assignedTo) {
            this.setState({
                score: this.state.score + 1
            })
        }
    }

    handleSelectBean(evt, bean) {
        this.setState({
            selectedBean: bean
        })
        this.assignGarbageToBean();
        this.compare()
        console.log("assignedGarbage :", this.state.assignedGarbage);
    }




    render() {
        const { error, loading, garbage, bean } = this.props;
        let garbageList;
        let beanList;

        if (error) {
            return <div>Erreur! {error.message}</div>;
        }

        if (loading) {
            return <div>Chargement...</div>;
        }

        if (garbage) {
            garbageList = garbage.map(item => {
                return (
                    <li key={item.id} onClick={evt => this.handleSelectGarbage(evt, item)}>)
                        {item.name}
                    </li>
                )
            });
        }

        if (bean) {
            beanList = bean.map(bean => {
                return (
                    <li key={bean.id} onClick={evt => this.handleSelectBean(evt, bean)}>
                        {bean.name}
                    </li>
                )
            })
        }

        return (
            <div className="main">
                <div className="itemList">
                    <ul>
                        {garbageList}
                    </ul>
                </div>
                <div className="dropdownBean">
                    {beanList}
                </div>
                <p> {this.state.score}</p>
            </div>
        )
    }


}
const mapStateToProps = state => ({
    loading: state.items.items.loading,
    error: state.items.error,
    bean: state.items.items.bean,
    garbage: state.items.items.garbage
});



export default connect(mapStateToProps)(ChoiceList);
