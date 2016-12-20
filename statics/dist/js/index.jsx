/**
 * @description 弹窗
 */
class Layer extends  React.Component{
    /**
     * @param {Object} props Foo
     */
    constructor(props) {
        super(props);

        this.state={
            show: false,
            isPageHide: true
        };
    }

    /**
     * @description hide
     * @returns {void}
     */
    hide(){
        const isPageHide = this.props.isPageHide;
        if (!isPageHide){
            this.setState({
                show: false
            });
        }
    }

    /**
     * @description hide
     * @returns {void}
     */
    componentDidMount(){
        this.setState({
            show: !!this.props.show
        });
    }

    /**
     * @description hide
     * @param {Object} nextProps 准备更新的属性
     * @returns {void}
     */
    componentWillReceiveProps(nextProps){
        this.setState({
            show: !!nextProps.show
        });
    }

    /**@description render
     *@return {Element} render
    */
    render(){
        let _class = '';

        if (this.state.show){
            _class = 'layermshow rlayerbox-show';
        }

        return (
            <div className={'rlayerbox layermbox ' + _class}>
                <div className="laymshade" onClick={this.hide.bind(this)}></div>
                <div className="layermmain">
                    <div className="section">
                        <div className="layermchild layermanim">
                            <div className="layermcont">{this.props.children}</div>
                        </div>
                    </div>
                </div>
                <IndexLess name="sh" />
            </div>
        );
    }
}

module.exports = Layer;
