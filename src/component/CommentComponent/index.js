import { memo, useState, useCallback, useRef } from 'react';
import { Avatar, Button, Comment, Form, List, Popover, Tooltip } from 'antd';
import { SendOutlined } from '@ant-design/icons';

import TextArea from 'antd/lib/input/TextArea';
import { useSelector } from 'react-redux';
import { http } from '../../axios';
import {
    deleteCommentURL,
    getAllCommentURL,
    insertCommentURL,
    updateCommentURL,
} from '../../axios/apiURL';
import { getUserInfo } from '../../redux/selectors';
import { toast } from 'react-toastify';

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
    const editValueComment = useRef('');

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
    const handleDeleteComment = useCallback(
        async (commentID) => {
            try {
                const response = await http.delete(
                    `${deleteCommentURL}?idComment=${commentID}`
                );

                let newCommentLists = [...commentLists];
                let currentIndex = newCommentLists.findIndex(
                    (comment) => comment.id === commentID
                );

                newCommentLists.splice(currentIndex, 1);
                setDataField({
                    ...dataField,
                    comments: newCommentLists,
                });

                toast.success('Delete Comment Successfully', {
                    autoClose: 1000,
                });
            } catch (err) {
                toast.error('Cannot Delete Comment', {
                    autoClose: 1000,
                });
            }
        },
        [commentLists, dataField, setDataField]
    );

    const handleOnChangeEditComment = useCallback((e) => {
        editValueComment.current = e.target.value;
    }, []);

    const handleEditComment = useCallback(
        async (commentId) => {
            try {
                const response = await http.put(
                    `${updateCommentURL}?id=${commentId}&contentComment=${editValueComment.current}`
                );
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
                let currentIndex = newCommentLists.findIndex(
                    (comment) => comment.id === id
                );

                newCommentLists.splice(currentIndex, 1, dataPushInMemberArray);

                setDataField({
                    ...dataField,
                    comments: newCommentLists,
                });
                toast.success('Edit Comment Successfully', {
                    autoClose: 1000,
                });
            } catch (e) {
                toast.error('Cannot Edit Comment', {
                    autoClose: 1000,
                });
            }
        },
        [
            commentLists,
            currentUser.avatar,
            currentUser.name,
            dataField,
            setDataField,
        ]
    );

    return (
        <div className="comments">
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
                        console.log();
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
                                content={
                                    <div>
                                        <div>{comment?.contentComment}</div>
                                        {comment.user.userId ===
                                            currentUser.id && (
                                            <div
                                                style={{
                                                    display: 'flex',
                                                    justifyContent:
                                                        'flex-start',
                                                    alignItems: 'center',
                                                    gap: '10px',
                                                }}
                                            >
                                                <Popover
                                                    content={
                                                        <div
                                                            style={{
                                                                width: '200px',
                                                            }}
                                                        >
                                                            <div
                                                                style={{
                                                                    position:
                                                                        'relative',
                                                                    width: '100%',
                                                                }}
                                                            >
                                                                <textarea
                                                                    type="text"
                                                                    defaultValue={
                                                                        comment?.contentComment
                                                                    }
                                                                    style={{
                                                                        padding:
                                                                            '5px 8px',
                                                                        width: '100%',
                                                                    }}
                                                                    onChange={
                                                                        handleOnChangeEditComment
                                                                    }
                                                                />
                                                                <button
                                                                    onClick={() =>
                                                                        handleEditComment(
                                                                            comment?.id
                                                                        )
                                                                    }
                                                                >
                                                                    <Tooltip title="Submit">
                                                                        <SendOutlined
                                                                            style={{
                                                                                position:
                                                                                    'absolute',
                                                                                right: '0',
                                                                                bottom: '0',
                                                                                margin: '15px 10px',
                                                                                fontSize:
                                                                                    '20px',
                                                                                color: '#192134',
                                                                            }}
                                                                        />
                                                                    </Tooltip>
                                                                </button>
                                                            </div>
                                                        </div>
                                                    }
                                                    title="Edit Comment"
                                                    trigger="click"
                                                    placement="bottom"
                                                >
                                                    <button className="button__comment button__comment--primary">
                                                        Edit
                                                    </button>
                                                </Popover>
                                                <button
                                                    className="button__comment button__comment--secondary"
                                                    onClick={() =>
                                                        handleDeleteComment(
                                                            comment?.id
                                                        )
                                                    }
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                }
                            />
                        );
                    })}
            </div>
        </div>
    );
}

export default memo(CommentComponent);
