<!-- ============= service-agreement  ============= -->
<template>
    <el-dialog :title="title"
               id="service-agreement" ref="service-agreement"
               :visible.sync="temp.dialogVisible" :modal-append-to-body="false"
               :top='null' :lock-scroll='true' :close-on-press-escape="true" @close="dialogClose()"
    >
        <h3>MiMo协议（草案）</h3>
        <p>欢迎您来到MiMo</p>
        <p>请您仔细阅读以下条款，如果您对本协议的任何条款表示异议，您可以选择不进入MiMo。当您注册成功，无论是进入MiMo，还是在使用MiMo的过程中，均意味着您（即「用户」）完全接受本协议项下的全部条款。</p>
        <h3>使用规则</h3>
        <p>1、用户注册成功后，MiMo将给予每个用户一个用户帐号及相应的密码，该用户帐号和密码由用户负责保管；用户应当对以其用户帐号进行的所有活动和事件负法律责任。</p>
        <p>2、用户须对在MiMo的注册信息的真实性、合法性、有效性承担全部责任，用户不得冒充他人；不得利用他人的名义发布任何信息；不得恶意使用注册帐号导致其他用户误认；否则MiMo有权立即停止提供服务，收回其帐号并由用户独自承担由此而产生的一切法律责任。</p>
        <p>3、用户直接或通过各类方式（如 RSS 源和站外 API 引用等）间接使用MiMo服务和数据的行为，都将被视作已无条件接受本协议全部内容；若用户对本协议的任何条款存在异议，请停止使用MiMo所提供的全部服务。</p>
        <p>4、MiMo是一个企业服装设计，流程化管理及信息分享、传播及获取的平台，企业和个人应当为其操作负全部责任</p>
        <p>5、用户承诺不得以任何方式利用MiMo直接或间接从事违反中国法律以及社会公德的行为。</p>
        <p>6、MiMo有权对用户使用MiMo的情况进行审查和监督，如用户在使用MiMo时违反任何上述规定，MiMo或其授权的人有权要求用户改正或直接采取一切必要的措施（包括但不限于更改或删除用户张贴的内容、暂停或终止用户使用MiMo的权利）以减轻用户不当行为造成的影响。</p>
        <h3>知识产权</h3>
        <p>1、MiMo提供的网络服务中包含的标识、版面设计、排版方式、文本、图片、图形等均受著作权、商标权及其它法律保护，未经相关权利人（含MiMo及其他原始权利人）同意，上述内容均不得在任何平台被直接或间接发布、使用、出于发布或使用目的的改写或再发行，或被用于其他任何商业目的。</p>
        <p>2、如果任何第三方侵犯了MiMo用户相关的权利，用户同意授权MiMo或其指定的代理人代表MiMo自身或用户对该第三方提出警告、投诉、发起行政执法、诉讼、进行上诉，或谈判和解，并且用户同意在MiMo认为必要的情况下参与共同维权。</p>
        <h3>个人隐私</h3>
        <p>
            尊重用户个人和企业隐私信息的私有性是MiMo的一贯原则，MiMo将通过技术手段、强化内部管理等办法充分保护用户的个人隐私信息，除法律或有法律赋予权限的政府部门要求或事先得到用户明确授权等原因外，MiMo保证不对外公开或向第三方透露用户个人隐私信息，或用户在使用服务时存储的非公开内容。同时，为了运营和改善MiMo的技术与服务，MiMo将可能会自行收集使用或向第三方提供用户的非个人隐私信息，这将有助于MiMo向用户提供更好的用户体验和服务质量。</p>
        <h3>免责申明</h3>
        <p>用户在MiMo上操作产生的问题或者非MiMo造成的数据泄露，需自行对其负责，因其操作不当造成的一切纠纷，由该内容的发表者承担全部法律及连带责任。MiMo不承担任何法律及连带责任。MiMo不保证网络服务一定能满足用户的要求，也不保证网络服务不会中断，对网络服务的及时性、安全性、准确性也都不作保证。</p>
        <p>对于因不可抗力或MiMo不能控制的原因造成的网络服务中断或其它缺陷，MiMo不承担任何责任，但将尽力减少因此而给用户造成的损失和影响。</p>
        <h3>协议修改</h3>
        <p>
            根据互联网的发展和有关法律、法规及规范性文件的变化，或者因业务发展需要，MiMo有权对本协议的条款作出修改或变更，一旦本协议的内容发生变动，MiMo将会直接在MiMo网站上公布修改之后的协议内容，该公布行为视为MiMo已经通知用户修改内容。MiMo也可采用电子邮件或私信的传送方式，提示用户协议条款的修改、服务变更、或其它重要事项。如果不同意MiMo对本协议相关条款所做的修改，用户有权并应当停止使用MiMo。如果用户继续使用MiMo，则视为用户接受MiMo对本协议相关条款所做的修改。</p>
    </el-dialog>
</template>
<script>
    export default{
        name: 'service-agreement',
        props: {
            temp: Object
        },
        data() {
            return {
                title: 'MiMo工作室服务协议',
            };
        },
        methods: {
            dialogClose(){

                this.$emit('tempChange', {'dialogVisible': false,});
            }
        }
    }
</script>


