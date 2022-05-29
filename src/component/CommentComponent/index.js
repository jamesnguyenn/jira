import { Avatar, Button, Comment, Form, List } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import { memo, useState } from 'react';
import { useSelector } from 'react-redux';
import { http } from '../../axios';
import { getAllCommentURL, insertCommentURL } from '../../axios/apiURL';
import { getUserInfo } from '../../redux/selectors';

const CommentList = ({ comments }) => (
    <List
        dataSource={comments}
        header={`${comments.length} ${
            comments.length > 1 ? 'replies' : 'reply'
        }`}
        itemLayout="horizontal"
        renderItem={(props) => <Comment {...props} />}
    />
);

const Editor = ({ onChange, onSubmit, submitting, value }) => (
    <>
        <Form.Item>
            <TextArea
                rows={4}
                onChange={onChange}
                value={value}
                placeholder="Add comment..."
            />
        </Form.Item>
        <Form.Item>
            <Button
                htmlType="submit"
                loading={submitting}
                onClick={onSubmit}
                type="primary"
                className="btn btn-primary"
                style={{ maxWidth: '150px', marginLeft: 'auto' }}
            >
                Add Comment
            </Button>
        </Form.Item>
    </>
);

function CommentComponent({ dataField, taskIdDetail, setDataField }) {
    const [submitting, setSubmitting] = useState(false);
    const [value, setValue] = useState('');
    const currentUser = useSelector(getUserInfo);

    const { comments: commentLists } = dataField;

    const handleSubmit = async () => {
        if (!value) return;
        setSubmitting(true);
        const response = await http.post(insertCommentURL, {
            taskId: taskIdDetail,
            contentComment: value,
        });
        const { alias, contentComment, id, taskId, userId } =
            response.data.content;
        const dataPushInMemberArray = {
            alias: alias,
            contentComment: contentComment,
            deleted: false,
            id: id,
            taskId: taskId,
            user: {
                userId: userId,
                name: currentUser.name,
                avatar: currentUser.avatar,
            },
            userId: userId,
        };
        let newCommentLists = [...commentLists];
        newCommentLists.push(dataPushInMemberArray);
        setDataField({
            ...dataField,
            comments: newCommentLists,
        });

        setSubmitting(false);
        setValue('');
    };

    const handleChange = (e) => {
        setValue(e.target.value);
    };
    return (
        <>
            {/* Header Comment */}
            <Comment
                avatar={
                    <Avatar src={currentUser.avatar} alt={currentUser.name} />
                }
                content={
                    <Editor
                        onChange={handleChange}
                        onSubmit={handleSubmit}
                        submitting={submitting}
                        value={value}
                    />
                }
            />
            {/* Body Comment Lists */}
            <div className="comment__lists">
                {commentLists.length > 0 &&
                    commentLists.map((comment) => {
                        return (
                            <Comment
                                key={comment?.id}
                                author={<span>{comment?.user?.name}</span>}
                                avatar={
                                    <Avatar
                                        src={comment?.user?.avatar}
                                        alt="Han Solo"
                                    />
                                }
                                content={<p>{comment?.contentComment}</p>}
                            />
                        );
                    })}
            </div>
        </>
    );
}

export default memo(CommentComponent);
