import BinOpNodeManager from "../parser/NodeManager/BinOpNodeManager.js";
import NumberNodeManager from '../parser/NodeManager/NumberNodeManager.js';
import UnaryOpNodeManager from '../parser/NodeManager/UnaryOpNodeManager.js';
import RTResult from "../runtime/RTResult.js";
import { TT } from '../../util/CONSTANTS.js';
import Context from "./Context.js";
import Number from "../types/Number.js";

export default class Interpreter {
    visit(node, context) {
        let toVisit = `visit_${node.constructor.name}`;
        if(!this[toVisit]) return this.noVisit(node);
        return this[toVisit](node, context)
    }

    noVisit(node) {
        throw new Error(`Could not visit ${node.constructor.name}`);
    }

    /**
     * Visit Number Node
     * @param {NumberNodeManager} node 
     * @param {Context} context 
     */
    visit_NumberNodeManager (node, context) {
        return new RTResult().success(
            new Number(node.token.value).setContext(context).setPosition(node.start, node.end)
        );
    }

    /**
     * Visit Binary Operation Node
     * @param {BinOpNodeManager} node 
     * @param {Context} context 
     */
    visit_BinOpNodeManager (node, context) {
        let res = new RTResult();
        let result;
    

        let left = res.register(this.visit(node.left, context));
        if(res.error) return res;
        let right = res.register(this.visit(node.right, context));
        if(res.error) return res;

        if(node.op.type === TT.PLUS) {
            result = left.addTo(right);
        } else if(node.op.type === TT.MINUS) {
            result = left.subtractBy(right);
        } else if(node.op.type === TT.MUL) {
            result = left.multiplyBy(right);
        } else if(node.op.type === TT.DIV) {
            result = left.dividedBy(right);
        } else if(node.op.type === TT.POWER) {
            result = left.powedBy(right);
        }


        if(result.error) {
            return res.failure(result.errorMessage)
        } else {
            return res.success(result.data.setPosition(node.start, node.end));
        }
    }

    /**
     * Visit Unary Operation Node
     * @param {UnaryOpNodeManager} node 
     * @param {Context} context 
     */
    visit_UnaryOpNodeManager(node, context) {
        let res = new RTResult();
        let number = res.register(this.visit(node.node, context));
        if(res.error) return res;

        let result = null;

        if(node.op.type === TT.MINUS) {
            result = number.multiplyBy(new Number(-1));
        };

        if(result.error) {
            return res.failure(result.errorMessage)
        } else {
            return res.success(number.data.setPosition(node.start, node.end));
        }
    }
}